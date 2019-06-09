import React from 'react';
import * as firebase from 'firebase';
import LawSuitCards from './lawSuitCards'

function HomeContent(props) {

    const [values, setLawSuite] = React.useState({
        allLawsuit: [],
      });

    const snapLawsuit = () => {
        firebase
          .database()
          .ref('/lawsuit/')
          .once('value')
          .then(snapshot => {
            const vals = snapshot.val();
            const lawsuit = Object.keys(vals);
            console.log(lawsuit);
            setLawSuite({ allLawsuit: lawsuit })
          });
      }

      React.useEffect(() => snapLawsuit(), [])
  return (
    <div>
        {props.userData.status !== 'admin'
            ? <LawSuitCards history={props.history} onLawSuitCardSelected={props.onLawSuitCardSelected} lawsuitId={props.userData.lawsuit} /> 
            : values.allLawsuit.map((id) => (
                    <LawSuitCards key={id} history={props.history} onLawSuitCardSelected={props.onLawSuitCardSelected} lawsuitId={id} /> 
              ))
        }
    </div>
  );
}

export default HomeContent
