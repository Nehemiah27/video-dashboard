db.auth("video_dashboard_admin", "2b0YlZxL79D");
db = db.getSiblingDB("video_dashboard");
db.createUser({
  user: "video_dashboard_db_owner",
  pwd: "i5u3h1PHb61",
  roles: [
    {
      role: "dbOwner",
      db: "video_dashboard",
    },
  ],
});
db.createCollection("users");
