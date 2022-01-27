import Filter from "../public/Images/filter"

function Explore(){
    return(
        <div className="leftsidebar">
            <div className="leftsidebar-container">
                <div className="leftsidebar-header">
                    <h1 className="left-header">Filter</h1>
                    <div className="p-4">
                        <Filter style={{ width:'20px', height:'20px', textAlign:"center" }} />
                    </div>
                </div>
                <div className="left-options">
                    
                </div>
            </div>           
        </div>
    )
}

export default Explore;