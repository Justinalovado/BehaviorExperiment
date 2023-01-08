import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useQuestion from '../hooks/useQuestion'

import Question from '../components/Question'
import './PostActivity.css'

function PostActivity() {
    const [questionIdx, setQuestionIdx] = useState(0);
    const question = useQuestion(questionIdx, "postActivity")
    return (
        <div className="PostActivity">
            <Question question={question} />
        </div>
  )
}

export default PostActivity