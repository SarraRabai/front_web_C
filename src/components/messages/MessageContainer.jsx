import React, { useContext } from 'react'
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import AuthContext from '../../auth/context';

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
  return (
    <div className='md:min-w-[450px] flex flex-col'>
        {!selectedConversation ? (
				<NoChatSelected />                                    
			) : (
			<>
		<div className='bg-slate-500 px-4 py-2 mb-2'>
		<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.name}</span>
		</div>
		<Messages />
        <MessageInput/>
            </>
            )}
        </div>
                    
  );
};

export default MessageContainer;

const NoChatSelected = () => {
	const { authState } = useContext(AuthContext);
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authState?.user?.name || "User"}</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
