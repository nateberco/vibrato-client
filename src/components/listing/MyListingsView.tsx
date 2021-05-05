import { Table, Button} from "reactstrap";
import MyPageCards from "./MyListingCards";


const MyListingsView = (props: any) => {
  const deleteListing = (listing: { id: any; }) => {
    fetch(`http://localhost:3000/listing/delete/${listing.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => {
      props.getListings();
    });
  };

  function changeBtn(e: any) {
    // e.target.style.fontSize = 'larger';
    e.target.style.color = '#f7e1d7';
    e.target.style.fontWeight = 'bold';
  }

  function resetBtn(e: any) {
    e.target.style.fontWeight = 'initial';
    e.target.style.color = 'white';
  }

  const listingsMapper = () => {
    return props.listings.map((listing: any, index: any) => {
      return (
        <>
        <tr key={index} >
          <td > 
            <MyPageCards listingItem={listing} />
            <div className="flexbox-container">
                <div className="flexbox-item-1">
                  <Button
                    style={{ backgroundColor: "#b0c4b1", marginRight: 5, width: 50 }}
                    onMouseOver={changeBtn} onMouseLeave={resetBtn}
                    onClick={() => {
                      props.editUpdateListing(listing);
                      props.updateOn();
                    }}
                  >
                    Edit
                  </Button>{" "}
                </div>
                <div className="flexbox-item-2">
                  <Button
                    style={{ backgroundColor: "#4a5759", marginLeft: 5, width: 75}}
                    onMouseOver={changeBtn} onMouseLeave={resetBtn}
                    onClick={() => {
                      deleteListing(listing);
                    }}
                  >
                    Delete
                  </Button>
                </div>
            </div>
          </td>
        </tr>
        </>
      );
    });
  };

  return (
    <>
      <h1 style={{color: "#91a597"}}>{localStorage.getItem("username")}'s Listings</h1>
      <br />
      <Table>
        <tbody>
          {props.listings.length === 0 ? (
            <h4>
              You have no listings yet.. Use the bar on the left to list
              some
            </h4>
          ) : (
            listingsMapper()
          )}
        </tbody>
      </Table>
    </>
  );
};

export default MyListingsView;
