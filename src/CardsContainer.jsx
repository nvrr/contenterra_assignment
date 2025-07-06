import { useEffect } from "react";
import { useState } from "react";

export function CardsContainer () {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("https://www.reddit.com/r/reactjs.json")
      .then((res) => res.json())
      .then((data) => {
        const items = data.data.children.map((item) => item.data);
        setPosts(items);
      })
      .catch((err) => console.error("Failed to fetch Reddit posts:", err))
      .finally(
        setLoading(false)
      )
  }, []);

  if (loading) {
    return (
      <div className="bg-yellow-50 w-screen h-screen flex items-center justify-center text-3xl text-blue-600">
      please wait...
      </div>
    );
  }

  return (
    <div className=" bg-white text-gray-600 min-h-screen">
      <h1 className="text-4xl text-neutral-400 mb-10 font-bold">ContententErra-Assignment</h1>
      <div className="max-w-[1280px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {posts.map((post) => (
            <CardUi
              key={post.id}
              title={post.title}
              selftextHtml={post.selftext_html}
              score={post.score}
              url={post.permalink}
            />
          ))}
       </div>
      </div>
    
  );
}


const CardUi = ({ title, selftextHtml, score,url }) => {
  const decodeHtmlEntities = (html) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  };
  const decodedHtml = decodeHtmlEntities(selftextHtml);

  return (
    <div className=" border-4 border-gray-300 bg-yellow-200 rounded-xl  p-4 flex flex-col justify-between h-full">
      <div>
        <h5 className="text-lg font-semibold mb-2 text-gray-800">{title}</h5>
       {decodedHtml ? <div
          className="h-64 text-sm text-gray-600 mb-3 scroll-mb-32  overflow-y-scroll no-scrollbar"
          dangerouslySetInnerHTML={{ __html: decodedHtml }}
        /> : <div className=" h-64 flex-1 flex items-center justify-center  p-4">No Content</div>}
      </div>
      
      <div className="mt-auto">
      <hr/>
        <small className="flex flex-col text-gray-500 mb-2">Score: {score}</small>
        <a
          href={`https://www.reddit.com${url}`}
          target="_blank"
          className="text-blue-600 hover:underline text-sm"
        >
          View Post
        </a>
      </div>
    </div>
  );
};

