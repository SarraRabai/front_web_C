import React, { useContext } from 'react'
import useConversation from '../../zustand/useConversation';
import AuthContext from '../../auth/context';
import { extractTime } from '../../utils/extractTime';


const Message = ({message}) => {
  const { authState  } = useContext(AuthContext);
	const { selectedConversation } = useConversation();

  if (!message || !authState?.user) {
    console.error("Missing critical data:", {
      hasMessage: !!message,
      hasAuthState: !!authState,
      hasUserId: authState?.user?._id
    });
    return null;
  }

  // Debug output
  console.log("Current User:", {
    id: authState.user._id,
    name: authState.user.name
  });
  console.log("Message Sender:", message.senderId);
  console.log("Current User ID:", authState.user._id);
  console.log("Message Sender ID:", message.senderId);
  console.log("Comparison Result:", String(message.senderId) === String(authState.user._id));


  const fromMe = message.senderId === authState.user._id;
  console.log("fromMe:",fromMe)
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-500";

  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img src={"https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"}
                    alt='Tailwind CSS chat bubble component' />
				   </div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message