import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GitHub({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    })
  ]
});