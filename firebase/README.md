# Firebase

Database schema:

```
users: {
  <userUid>: {
    displayName: string,
    email: string,
    photoURL: string
  }
},
trips: {
  <tripUid>: {
    user: <userUid>,
    dateStart: Date,
    dateEnd: Date,
    createdAt: Date,
    banner: string,
    description: string,
    stories: <storyUid>[]
  }
},
stories: {
  <storyUid>: {
    dateStart: Date,
    dateEnd: Date,
    description: string
  }
},
physicalWeb: {
  <physicalWebUid>: {
    user: <userUid>,
    name: string,
    value: string
  }
}
```