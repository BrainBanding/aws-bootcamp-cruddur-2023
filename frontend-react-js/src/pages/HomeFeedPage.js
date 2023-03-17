// import "./HomeFeedPage.css";
// import React from "react";
// import { Auth } from "aws-amplify";
// import React, { useEffect, useState, useRef } from "react";

// import DesktopNavigation from "../components/DesktopNavigation";
// import DesktopSidebar from "../components/DesktopSidebar";
// import ActivityFeed from "../components/ActivityFeed";
// import ActivityForm from "../components/ActivityForm";
// import ReplyForm from "../components/ReplyForm";
// import { Amplify } from "aws-amplify";

// export default function HomeFeedPage() {
//   const [activities, setActivities] = React.useState([]);
//   const [popped, setPopped] = React.useState(false);
//   const [poppedReply, setPoppedReply] = React.useState(false);
//   const [replyActivity, setReplyActivity] = React.useState({});
//   const [user, setUser] = React.useState(null);
//   const dataFetchedRef = React.useRef(false);

//   const loadData = async () => {
//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_BACKEND_URL}/api/activities/home`
//       );
//       const resJson = await res.json();
//       if (res.ok) {
//         setActivities(resJson);
//       } else {
//         console.error(res);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const checkAuth = async () => {
//     try {
//       const user = await Auth.currentAuthenticatedUser({
//         bypassCache: false,
//       });
//       setUser({
//         display_name: user.attributes.name,
//         handle: user.attributes.preferred_username,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   React.useEffect(() => {
//     loadData();
//     checkAuth();
//   }, []);

//   return (
//     <article>
//       <DesktopNavigation user={user} active={"home"} setPopped={setPopped} />
//       <div className="content">
//         <ActivityForm
//           popped={popped}
//           setPopped={setPopped}
//           setActivities={setActivities}
//         />
//         <ReplyForm
//           activity={replyActivity}
//           popped={poppedReply}
//           setPopped={setPoppedReply}
//           setActivities={setActivities}
//           activities={activities}
//         />
//         <ActivityFeed
//           title="Home"
//           setReplyActivity={setReplyActivity}
//           setPopped={setPoppedReply}
//           activities={activities}
//         />
//       </div>
//       <DesktopSidebar user={user} />
//     </article>
//   );
// }
import "./HomeFeedPage.css";
import React from "react";
import { Auth } from "aws-amplify";

import DesktopNavigation from "../components/DesktopNavigation";
import DesktopSidebar from "../components/DesktopSidebar";
import ActivityFeed from "../components/ActivityFeed";
import ActivityForm from "../components/ActivityForm";
import ReplyForm from "../components/ReplyForm";

export default function HomeFeedPage() {
  const [activities, setActivities] = React.useState([]);
  const [popped, setPopped] = React.useState(false);
  const [poppedReply, setPoppedReply] = React.useState(false);
  const [replyActivity, setReplyActivity] = React.useState({});
  const [user, setUser] = React.useState(null);
  const dataFetchedRef = React.useRef(false);

  const loadData = async () => {
    try {
      const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/home`;
      const res = await fetch(backend_url, {
        method: "GET",
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setActivities(resJson);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkAuth = async () => {
    console.log("checkAuth");
    // [TODO] Authenication
    if (Cookies.get("user.logged_in")) {
      setUser({
        display_name: Cookies.get("user.name"),
        handle: Cookies.get("user.username"),
      });
    }
  };

  React.useEffect(() => {
    //prevents double call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    loadData();
    checkAuth();
  }, []);

  return (
    <article>
      <DesktopNavigation user={user} active={"home"} setPopped={setPopped} />
      <div className="content">
        <ActivityForm
          popped={popped}
          setPopped={setPopped}
          setActivities={setActivities}
        />
        <ReplyForm
          activity={replyActivity}
          popped={poppedReply}
          setPopped={setPoppedReply}
          setActivities={setActivities}
          activities={activities}
        />
        <ActivityFeed
          title="Home"
          setReplyActivity={setReplyActivity}
          setPopped={setPoppedReply}
          activities={activities}
        />
      </div>
      <DesktopSidebar user={user} />
    </article>
  );
}

//   const loadData = async () => {
//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_BACKEND_URL}/api/activities/home`
//       );
//        headers: {
//          Authorization: `Bearer ${localStorage.getItem("access_token")}`;
//        }
//       const resJson = await res.json();
//       if (res.ok) {
//         setActivities(resJson);
//       } else {
//         console.error(res);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const checkAuth = async () => {
//     try {
//       const user = await Auth.currentAuthenticatedUser({
//         bypassCache: false,
//       });
//       setUser({
//         display_name: user.attributes.name,
//         handle: user.attributes.preferred_username,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   React.useEffect(() => {
//     if (!dataFetchedRef.current) {
//       loadData();
//       checkAuth();
//       dataFetchedRef.current = true;
//     }
//   }, []);

//   return (
//     <article>
//       <DesktopNavigation user={user} active={"home"} setPopped={setPopped} />
//       <div className="content">
//         <ActivityForm
//           popped={popped}
//           setPopped={setPopped}
//           setActivities={setActivities}
//         />
//         <ReplyForm
//           activity={replyActivity}
//           popped={poppedReply}
//           setPopped={setPoppedReply}
//           setActivities={setActivities}
//           activities={activities}
//         />
//         <ActivityFeed
//           title="Home"
//           setReplyActivity={setReplyActivity}
//           setPopped={setPoppedReply}
//           activities={activities}
//         />
//       </div>
//       <DesktopSidebar user={user} />
//     </article>
//   );
// }
