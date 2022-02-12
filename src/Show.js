import { Link} from "react-router-dom";

const Show = (props) => {
  let image = `image-not-available.jpg`;
  if (props.show.poster_path !== null) {
    image = `https://image.tmdb.org/t/p/w500${props.show.poster_path}`;
  }

  const onWatchList = (show) => {
    props.onWatchList(show);
  }
  
  const onWatchListAlready = (selectedShow) => {
    let findInList = props.watchList.find(show => show.id === selectedShow.id);
    if (findInList !== undefined) {
      return findInList.alreadyOnWatchList;
    }
  }

  return (
    <div className="movie">
      <Link to={`/details/${props.show.id}`}>
        <img src={image} alt="Movie poster" />
        <div className="overlay">
          <div className="title">{props.show.name}</div>
          <div className="rating">{props.show.vote_average}</div>
          <div className="plot">
            {props.show.overview}
          </div>
        </div>
      </Link>
      <div data-toggled={onWatchListAlready(props.show)} className="listToggle" onClick={(e) => {onWatchList(props.show)}}>
        <div><i className="fa fa-fw fa-plus"></i><i className="fa fa-fw fa-check"></i></div>
      </div>
    </div>
  )
}

export default Show