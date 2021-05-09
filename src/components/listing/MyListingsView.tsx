import { Table, Button} from "reactstrap";
import MyPageCards from "./MyListingCards";
import APIURL from '../../helpers/environment';


const MyListingsView = (props: any) => {
  const deleteListing = (listing: { id: any; }) => {
    fetch(`${APIURL}/listing/delete/${listing.id}`, {
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
            <div className="edit-delete-btns">
                <div>
                  <Button className="edit-button1"
                    onMouseOver={changeBtn} onMouseLeave={resetBtn}
                    onClick={() => {
                      props.editUpdateListing(listing);
                      props.updateOn();
                    }}
                  >
                    Edit
                  </Button>{" "}
                </div>
                <div>
                  <Button className="delete-button1"
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
      <Table>
        <tbody>
          {props.listings.length === 0 ? (
            <h4 style={{ color: '#efb5a3', fontSize: "3em"}}>
              You have no listings...
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
