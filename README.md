# How to Install

## yarn install

# FROM DB TO CODE

## npx prisma db pull

# FROM CODE TO DB

## npx prisma generate

## npx prisma migrate dev

# FROM CODE TO DB

# TODO API : 

1. Login :
{"id", "isSuccess", "token"}

2. Get User Details : 
{"id", "email", "image", "name", "nip", "role"=["ADMIN","USER"]}

3. Get User Summary :
{"id", "email", "image", "name", "nip", "role"=["ADMIN","USER"], "completedCourse", "totalCourse", "averageScore", "roomJoined"="1234"}

4. Get Room
{"id", "name", "capacity", "filled", "createdAt", "updatedAt","image"}
+ filter by joined

5. Get Detail Room
{"id", "name", "capacity", "filled", "createdAt", "updatedAt","image", "member(user in room)", "member image", "member id", "admin room": {"name", "nip"}}

6. 