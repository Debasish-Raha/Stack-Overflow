import React from 'react'
import Question from './Question'
//import { useTranslation } from 'react-i18next';

function Questionlist({questionlist}) {
  //const { t } = useTranslation();
  // console.log(questionlist)
  return (
    <>
    {questionlist.map((question)=>(
      <Question question={question} key ={question._id}/>
    ))}
    </>
  )
}

export default Questionlist