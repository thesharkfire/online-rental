import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { review } from '../redux/authSlice'

function ReviewSection({product}) {

  const [review, setReview] = useState('')
  const user = JSON.parse(localStorage.getItem('auth'))
/*
  const handleClick = () => {
    const finalReview =`${user.result.name}: ${review}`//replace withemail
    dispatch(reviewProduct(finalReview, post._id))
  }
*/
  return (
    <div>
          <div> Reviews </div>
          {/*reviews.map((r, i) =>{// review, index
            <div key = {i}>
              Comment {i}
            </div>

          )}*/}
          <div style = {{width: '70%'}}>
            Write a  Review
          </div>
          {/*TextField value = {review} onChange = {(e) =>setReview(e.target.value)}*/}
    
 {/*
    <Button disabled = {!review} onClick = {handleClick}>


     </Button>

     */}
     </div>
  )

}

export default ReviewSection
