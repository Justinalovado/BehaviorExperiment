import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useQuestion from '../hooks/useQuestion'

import './PostActivity.css'

function PostActivity() {
    const [questionIdx, setQuestionIdx] = useState(0);
    const question = useQuestion(questionIdx, "postActivity")
    return (
        <div className="PostActivity">
            <div className="question">
                <span>{question}</span>
            </div>
        </div>
  )
}

export default PostActivity