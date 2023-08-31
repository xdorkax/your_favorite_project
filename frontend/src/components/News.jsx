import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ClampLines from "react-clamp-lines";
import "./News.css";

function News() {
  const [news, setNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [displayedNewsIndices, setDisplayedNewsIndices] = useState(new Set());
  const [isNewsExhausted, setIsNewsExhausted] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/dummyNews.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
        setNews(data);
        setDisplayedNews(data.slice(0, 4));
        setDisplayedNewsIndices(new Set([0, 1, 2, 3]));
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  const addRandomNews = () => {
    if (displayedNewsIndices.size === news.length) {
      setIsNewsExhausted(true);
      return;
    }
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * news.length);
    } while (displayedNewsIndices.has(randomIndex));
    setDisplayedNews([news[randomIndex], ...displayedNews]);
    setDisplayedNewsIndices(new Set(displayedNewsIndices.add(randomIndex)));
  };

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  return (
    <div>
      <Paper
        className="filterAndSubmit"
        style={{
          padding: "1rem",
          margin: "2rem 2rem 0.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h2">Daily News</Typography>

        <FormControl label="Select a category" style={{ minWidth: "12rem" }}>
          <InputLabel>Select a category</InputLabel>
          <Select value={filterCategory} onChange={handleCategoryChange}>
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color={isNewsExhausted ? "secondary" : "primary"}
          onClick={addRandomNews}
          style={{ minWidth: "12rem", padding: ".9rem", border: "none" }}
        >
          {isNewsExhausted
            ? "We have run out of news!"
            : "Generate a Random News"}
        </Button>
      </Paper>

      <Paper
        className="newsContainer"
        style={{ margin: "0 2rem 2rem 2rem", padding: "1.5rem" }}
      >
        {displayedNews
          .filter((item) => !filterCategory || item.category === filterCategory)
          .map((item, i) => (
            <Card className="newsCard" key={i}>
              <CardHeader
                className="newsTitle"
                title={item.title}
                titleTypographyProps={{ variant: "h5" }}
                subheader={`Read time: ${item.read_time} - Category: ${item.category}`}
                subheaderTypographyProps={{ color: "gray" }}
              />
              <CardContent>
                <ClampLines
                  text={item.content}
                  id={"newsContent" + i}
                  lines={2}
                  lessText="Close"
                  className="newsContent"
                  innerElement="p"
                  key={i + displayedNews.length}
                />
                <Typography
                  className="newsSource"
                  variant="body2"
                  color="blue"
                  component="p"
                >
                  Source: {item.source}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Paper>
    </div>
  );
}

export default News;
