import allSent from "../../Lib/Sent";
import MemoList from "../../Components/MemoList";

const Sent = () => {
  return <MemoList fetchMemos={allSent} pageTitle="Sent Memos" />;
};

export default Sent;
