import AllArchived from "../../Lib/Archived";
import MemoList from "../../Components/MemoList";

const Archived = () => {
  return (
    <MemoList
      fetchMemos={AllArchived}
      pageTitle="Archived Memos"
      archived={true}
    />
  );
};

export default Archived;
