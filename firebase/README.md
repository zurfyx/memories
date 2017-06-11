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
    title: string,
    dateStart: number,
    dateEnd: number,
    createdAt: number,
    updatedAt: number,
    banner: string,
    description: string
  }
},
stories: {
  <storyUid>: {
    journey: <journeyUid>,
    owner: <ownerUid>,
    dateStart: number,
    updatedAt: number,
    title: string,
    description: string,
    map: {
      lat: number,
      long: number
    },
    coverURL: string,
    photos: {
      url: string,
      title: string
    }
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