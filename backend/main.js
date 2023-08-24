const express = require('express');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const { QuickDB } = require('quick.db');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 3001;

// Initialize the database
const db = new QuickDB();

// Express middleware
app.use(express.json());
app.use(session({
    secret: '@bc',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

// Passport configuration
passport.use(
    new DiscordStrategy(
        {
            clientID: '914010773842452601',
            clientSecret: '2nHV2FnuH7jSTV6ghshranvhyFbxCtra',
            callbackURL: 'http://localhost:3001/auth/discord/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

function checkAuth(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.status(401).json({ error: true, message: 'Not authenticated' });
    }
}

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

app.get(
    '/auth/discord',
    passport.authenticate('discord', { scope: ['identify'] })
);

app.get('/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/' }),
    async (req, res) => {
        if (req.user) {
            let u = await db.get(req.user.id);
            await db.set(req.user.id, {
                id: req.user.id,
                name: req.user.global_name,
                username: req.user.username,
                avatar: req.user.avatar
            })
            return res.redirect("http://localhost:3000")
        }
    }
);

app.get('/profile', async (req, res) => {
    if (req.user) {
        const user = req.user;
        console.log(user)
        const udata = await db.get(req.user.id?.toString())
        res.json({ auth: true, user: udata });
    } else {
        res.status(401).json({ auth: false, message: 'Not authenticated' });
    }
});

app.get('/posts', async (req, res) => {
    const posts =(await db.all()).filter(x => x.id.endsWith("-posts")) || [];
    res.json({ error: false, data: posts })
})

app.get('/posts/:id', async (req, res) => {
    const posts = (await db.all()).filter(x => x.id.endsWith(req.params.id+"-posts")) || [];
    res.json({ error: false, data: posts })
})

app.post('/post/create', checkAuth, async (req, res) => {
    const user = await db.get(req.user.id);

    let { content } = req.body;
    if (!content || content.length <= 2) return res.send({ error: true, message: "Contents should be atleast 3 letters!" })

    await db.push(`${req.user.id}-posts`, {
        content,
        user,
        created_on: Date.now()
    })
    return res.send({ error: false, message: "Successfully created a post"});
})

app.post('/post/delete', checkAuth, async (req, res) => {
    const user = await db.get(req.user.id);

    let { id } = req.body;
    if (!id) return res.send({ error: true, message: "ID of the post is needed!" })
    id=Number(id);

    let userPosts = await db.get(`${req.user.id}-posts`);
    
    if(!userPosts || !userPosts[id]) return res.send({ error: true, message: "Post not found" });

    userPosts.splice(id, 1);

    await db.set(`${req.user.id}-posts`, userPosts);
    return res.send({ error: false, message: "Successfully deleted a post"});
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
