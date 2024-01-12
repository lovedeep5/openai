import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGeoPointsFromGPT, getImageFromGPT } from "../../store/leafletSlice";
import { AppDispatch, RootState } from "../../store/store";
import Styles from "./SearchForm.module.scss";

const messages = [
  {
    role: "system",
    content:
      "The JSON response should include the following keys: 'coordinates' with a value in the format [43.6426, -79.8366] representing the location's coordinates, 'title' with a brief description of the location.",
  },
];

const requestData = {
  model: "gpt-3.5-turbo",
  messages,
  // temperature: 0.7,
};

const imageRequestData = {
  model: "dall-e-2",
  prompt: "",
  n: 1,
  size: "1024x1024",
};

const SearchForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.leaflet);
  const [input, setInput] = useState<string>("");

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedMessage = [...messages, { role: "user", content: input }];
    const updatedRequest = { ...requestData, messages: updatedMessage };

    dispatch(getGeoPointsFromGPT(updatedRequest));

    const updatedImageRequest = { ...imageRequestData, prompt: input };
    dispatch(getImageFromGPT(updatedImageRequest));
  };

  return (
    <div className={Styles.searchFormContainer}>
      <div>
        <form action="#" onSubmit={formSubmitHandler}>
          <input
            type="text"
            name="search"
            value={input}
            onChange={inputChangeHandler}
            placeholder="Search location"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
