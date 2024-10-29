import allStarred from "../../Lib/Starred";
import MemoList from "../../Components/MemoList";

const Favourite = () => {
  return (
    <MemoList
      fetchMemos={allStarred}
      pageTitle="Starred Memos"
      starred={true}
    />
  );
};

export default Favourite;
