import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'
import SuggestedUsers from './SuggestedUsers'

function RightSideBar() {
  const {user} = useSelector((store)=>store.auth)
  return (
    <div className="w-fit mr-20 mt-5">   
            <div className="flex items-center gap-2">
            <Link to={`/profile/${user?._id}`}>
            <Avatar>
              <AvatarImage src={user?.profilepicture} alt="post_Image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </Link>

            <div className="flex items-center gap-3">
              <Link to={`/profile/${user?._id}`}><h1>{user?.username}</h1></Link>
            <span><Badge variant='secondary'>{user?.faculty}</Badge></span>
            </div>
          </div>

          <SuggestedUsers/>
    </div>
  )
}

export default RightSideBar
