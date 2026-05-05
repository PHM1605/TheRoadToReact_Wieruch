import './App.css'
import React from 'react';
import axios from 'axios';

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

// const initialStories = [
//   {
//     title: "React",
//     url: "https://reactjs.org/",
//     author: "Jordan Walke",
//     num_comments: 3,
//     points: 4,
//     objectID: 0
//   },
//   {
//     title: "Redux",
//     url: "https://redux.js.org/",
//     author: "Dan Abramov, Andrew Clark",
//     num_comments: 2,
//     points: 5,
//     objectID: 1
//   }
// ];

// interface PromiseStories {
//   data: {
//     stories: Story[];
//   };
// }

// const getAsyncStories = () =>
//   new Promise<PromiseStories>((resolve)=>
//     setTimeout( () => resolve({data: {stories: initialStories}}), 2000)
//   );

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [stories, setStories] = React.useState<Story[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(()=>{
    setIsLoading(true);
    fetch(`${API_ENDPOINT}react`)
    .then((response) => response.json())
    .then(result => {
      console.log(result)
      setStories(result.data.stories);
      setIsLoading(false);
    })
    .catch(()=>setIsError(true));
  }, [])

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
      {isError && <p>Something went wrong...</p>}
      {
      isLoading ? 
      <p>Loading...</p>
      : <List list={searchStories} onRemoveItem={handleRemoveStory}/>
      }
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
  
  return (
    <li>
      <span><a href={props.item.url}>{props.item.title}</a></span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>
      <span>
        <button type="button" onClick={() => props.onRemoveItem(props.item)}>Dismiss</button>
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
