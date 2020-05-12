const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const config = require("../utils/config");
const bcrypt = require("bcrypt");
const passport = require("passport");

// - JWT Stratedy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Bearer"),
      secretOrKey: config.JWT_SECRET,
      passReqToCallback: true,
    },
    async (req, payload, done) => { 
      try { 
        const user = await User.findById(payload.id);

        if (!user) {
          return done(null, false);
        }

        req.user = user;
        done(null, user);
      } catch (err) {
        console.log(err);
        done(err, false);
      }
    }
  )
);

// - Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {
        console.log(err);
        done(err, false);
      }
    }
  )
);
