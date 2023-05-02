import React from 'react'
import Notes from './Notes';


function Home(props) {
  const {showAlert, mode} = props;

  return (
    <>
      <Notes showAlert={showAlert} mode={mode} />
    </>
  )
}

export default Home;