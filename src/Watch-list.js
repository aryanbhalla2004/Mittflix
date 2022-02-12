import Show from './Show';

const WatchList = (props) => {
  return (
    <div class="titleList">
      <div class="title">
        <h1>My Watch List</h1>
        <div class="titles-wrapper">
          {
            props.watchList && props.watchList.map(show => (
              <Show show={show} key={show.id} onWatchList={props.onWatchList} watchList={props.watchList}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default WatchList;