import { HiChartBar } from 'react-icons/hi';
import './DemoDifficultyTag.css';

//you just need to pass in "beginner", "intermediate", or "advanced" as one of the props. any other prop apart from those three will not trigger the appropriate stylings of the tag. be careful about capitalization
//if you would like to change the size of the tag, just wrap this component around a wrapper container and alter the dimensions of the wrapper container
const DemoDifficultyTag = ({ textSelection }) => {
  return (
    <>
      {
        // TODO: add better option for "imported" texts instead of defaulting to "beginner"
      }
      <span className={`demo-difficulty-tag-${textSelection !== "imported" ? textSelection : "beginner"}`}>
        <HiChartBar /> {`${textSelection[0].toUpperCase() + textSelection.slice(1)}`}{' '}
      </span>
    </>
  );
};

export default DemoDifficultyTag;
