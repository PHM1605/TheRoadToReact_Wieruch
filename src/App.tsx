import './App.css'
import React from 'react';

interface Story {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
}

const useStorageState = (key: string, initialState: string) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) ||initialState);
  React.useEffect(()=>{
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue] as const;
}

const initialStories = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [stories, setStories] = React.useState(initialStories);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveStory = (item: Story) => {
    const newStories = stories.filter((story) => item.objectID != story.objectID);
    setStories(newStories);
  }

  const searchStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>  
      <InputWithLabel id="search" value={searchTerm} type="text" isFocused onInputChange={handleSearch}>
      <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      <List list={searchStories} onRemoveItem={handleRemoveStory}/>
    </div>
  );
}

const List = (props: {list: Story[], onRemoveItem: (item: Story)=>void}) => {
  return (
    <ul>
      {props.list.map((item: Story) => {
        return (
          <Item key={item.objectID} item={item} onRemoveItem={props.onRemoveItem}/>
        )
      })}
    </ul>
  )
};


const Item = (props: {key:number, item:Story, onRemoveItem: (item:Story)=>void}) => {
  const handleRemoveItem = () => {
    props.onRemoveItem(props.item);
  };
  return (
    <li>
      <span><a href={props.item.url}>{props.item.title}</a></span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>
      <span>
        <button type="button" onClick={handleRemoveItem}>Dismiss</button>
      </span>
      
    </li>
  );
}

const InputWithLabel = (props: {
  id: string;
  value: string;
  type: string;
  isFocused: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: string | JSX.Element | JSX.Element[];
}) => {
  return (
    <>
    <label htmlFor={props.id}>{props.children}</label>
    <input type={props.type} id={props.id} value={props.value} autoFocus={props.isFocused} onChange={props.onInputChange}/>
    </>
  );
}

export default App
