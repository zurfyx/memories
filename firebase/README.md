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
journeys: {
  <tripUid>: {
    owner: <userUid>,
    dateStart: number,
    dateEnd: number,
    createdAt: number,
    updatedAt: number,
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

Storage schema:

```
<userUid>: {
  <fileUid>
}