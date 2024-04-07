import './App.css';
import FriendsList from './Component/FriendsList';
import FormAddFriend from './Component/FormAddFriend';
import Button from  './Component/Button'
import {useState} from 'react';
import FormSplitBill from './Component/FormSplitBill';

function App() {
  const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
  ];
  const [friends , setFriends] = useState(initialFriends)
  const [showAddFriend,setShowAddFriend] = useState(false)
  const [selectedFriend,setSelectedFriend] = useState(null)


  function handleShowAddFriend() {
    setShowAddFriend((show)=> !show)
  }

  function handleAddFriend(friend) {
    setFriends(friends => [ ...friends, friend ])
    setShowAddFriend(false)
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend)
    setSelectedFriend((cur) => cur?.id === friend.id ? null : friend)
    setShowAddFriend(false)
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} selectedFriend={selectedFriend} onSelection={handleSelection} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? 'Close' : 'Add Friend'}</Button>

      </div>

      {selectedFriend && <FormSplitBill onSplitBill={handleSplitBill} selectedFriend={selectedFriend} key={selectedFriend.id} />}

    </div>
  );
}

export default App;
