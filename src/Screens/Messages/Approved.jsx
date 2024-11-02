import MemoList from "../../Components/MemoList";
import AllApproved from "../../Lib/Approved";

const Approved = () => {
  return <MemoList fetchMemos={AllApproved} pageTitle="Approved Memos" />;
};

export default Approved;
