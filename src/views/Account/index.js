import React, { useContext, useEffect, useState } from "react";
import { AuthUserContext, withAuthorization } from "../../hocs/Session";
import withFirebase from "../../Firebase/context";
import { getCurrentDate } from "../../utils";
import { CircularProgress } from "@material-ui/core";

const currentDate = getCurrentDate();
const AccountPage = () => {
  const authUser = useContext(AuthUserContext);
  const firebase = useContext(withFirebase);
  const userId = authUser.uid;

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalIdeas, setTotalIdeas] = useState(0);
  const [bestIdea, setBestIdea] = useState({});

  const fbUserStats = firebase.userStats(userId);

  useEffect(() => {
    fbUserStats.once("value", snapshot => {
      const statsVal = snapshot.val();
      if (statsVal) {
        // Populate the list by going through the data we get from firebase db
        const ideaStats = Object.keys(statsVal).map(key => ({
          count: statsVal[key].ideasCount,
          id: statsVal[key].createdAt,
          date: statsVal[key].date,
        }));

        const totalIdeasCount = ideaStats.reduce(
          (acc, cur) => acc.count + cur.count
        );
        let bestIdeatemp = { count: 0, date: null };
        ideaStats.forEach((stat, key) => {
          if (stat.count > bestIdeatemp.count) {
            bestIdeatemp = { ...stat };
          }
        });
        setBestIdea(bestIdeatemp);
        setTotalIdeas(totalIdeasCount);
        setStats([...ideaStats]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h1>Welcome {authUser.displayName}</h1>
          <h2>You've created a total of {totalIdeas} ideas so far!</h2>
          <h3>
            Your best day was {bestIdea.date} with {bestIdea.count} ideas!
          </h3>
        </>
      )}
    </>
  );
};

export default withAuthorization(authUser => !!authUser)(AccountPage);
