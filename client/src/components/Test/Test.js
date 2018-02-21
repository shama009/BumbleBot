import  React, {Component } from "react";

class Test extends Component {

    render() {
        return (
            // <form>
            //     <label>Pick your favorite La Croix flavor:
            //     <select value={this.props.method} onChange={this.props.handleInputChange}>
            //         <option value="fav">Fav</option>
            //         <option value="retweet">Retweet</option>
            //     </select>
            //     </label>
            //     <input type="submit" value="Submit" />
            // </form>
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={true}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                    Number of guests:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        )
    }
}

export default Test;