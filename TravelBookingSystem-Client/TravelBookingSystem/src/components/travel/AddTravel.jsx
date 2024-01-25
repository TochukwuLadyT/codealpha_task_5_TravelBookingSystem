import React, { useState } from 'react';
import { addTravel} from '../utils/ApiFunctions';
import LocationSelector from '../common/LocationSelector';
import { Link } from 'react-router-dom';

const AddTravel = () => {
    const [newTravel, setNewTravel] = useState({
        roomPhoto: null,
        flightSitPhoto: null,
        transportSitPhoto: null,
        cityName: "",
        country: "",
		hotelName: "",
        roomType: "",
        roomPrice: "",
		flightName: "",
        flightType: "",
        flightPrice: "",
		transportationName: "",
        transportationType: "",
        transportationPrice: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
	const [imagePrevie, setImagePrevie] = useState("");
	const [imagePrevi, setImagePrevi] = useState("");

    const handleTravelInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "roomPrice" || name === "flightPrice" || name === "transportationPrice") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }
        setNewTravel({ ...newTravel, [name]: value });
    };


	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setNewTravel({ ...newTravel, roomPhoto: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleImageChanges = (e) => {
		const selectedImage = e.target.files[0]
		setNewTravel({ ...newTravel, flightSitPhoto: selectedImage })
		setImagePrevie(URL.createObjectURL(selectedImage))
	}

	const handleImageChangess = (e) => {
		const selectedImage = e.target.files[0]
		setNewTravel({ ...newTravel, transportSitPhoto: selectedImage })
		setImagePrevi(URL.createObjectURL(selectedImage))
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  const success = await addTravel(
			newTravel.roomPhoto,
			newTravel.flightSitPhoto,
			newTravel.transportSitPhoto,
			newTravel.cityName,
			newTravel.country,
			newTravel.hotelName,
			newTravel.roomType,
			newTravel.roomPrice,
			newTravel.flightName,
			newTravel.flightType,
			newTravel.flightPrice,
			newTravel.transportationName,
			newTravel.transportationType,
			newTravel.transportationPrice,
		
		  );
	  
		  if (success !== undefined) {
			setSuccessMessage("New travel services added successfully");
			setNewTravel({
			  roomPhoto: null,
			  flightSitPhoto: null,
			  transportSitPhoto: null,
			  cityName: "",
			  country: "",
			  hotelName: "",
			  roomType: "",
			  roomPrice: "",
			  flightName: "",
			  flightType: "",
			  flightPrice: "",
			  transportationName:"",
			  transportationType: "",
			  transportationPrice: "",
			});
			setImagePreview("");
			setErrorMessage("");
		  } else {
			setErrorMessage("Error adding new travel services");
		  }
		} catch (error) {
		  setErrorMessage(error.message);
		}
		setTimeout(() => {
		  setSuccessMessage("");
		  setErrorMessage("");
		}, 3000);
	  };

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h5 className="mt-5 mb-2">Add New Travel Services</h5><br></br>
                        {successMessage && <div className="alert alert-success fade show"> {successMessage}</div>}

                        {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

			<form onSubmit={handleSubmit}>
			<div>
			<LocationSelector
				handleTravelInputChange={handleTravelInputChange}
				newTravel={newTravel}
			/>
			</div>
			
			<div className="mb-3">
				<div className="row">
				<div className="col-md-4">
					<label htmlFor="roomPhoto" className="form-label hotel-color">
					Room Photo
					</label>
					<input
					required
					name="roomPhoto"
					id="roomPhoto"
					type="file"
					className="form-control"
					onChange={handleImageChange}
					/>
					{imagePreview && (
					<img
						src={imagePreview}
						alt="Preview room photo"
						style={{ maxWidth: "100%", maxHeight: "200px" }}
						className="mt-3"
					/>
					)}
				</div>
				<div className="col-md-4">
					<label htmlFor="roomPrice" className="form-label hotel-color">
					Room Price
					</label>
					<input
					required
					type="number"
					className="form-control"
					id="roomPrice"
					name="roomPrice"
					value={newTravel.roomPrice}
					onChange={handleTravelInputChange}
					/>
				</div>
				
				</div>
			</div>

			<div className="mb-3">
				<div className="row">
				<div className="col-md-4">
					<label htmlFor="flightSitPhoto" className="form-label hotel-color">
					Flight Photo
					</label>
					<input
					required
					name="flightSitPhoto"
					id="flightSitPhoto"
					type="file"
					className="form-control"
					onChange={handleImageChanges}
					/>
					{imagePrevie && (
					<img
						src={imagePrevie}
						alt="Preview flight photo"
						style={{ maxWidth: "100%", maxHeight: "200px" }}
						className="mt-3"
					/>
					)}
				</div>
				<div className="col-md-4">
					<label htmlFor="flightPrice" className="form-label hotel-color">
					Flight Price
					</label>
					<input
					required
					type="number"
					className="form-control"
					id="flightPrice"
					name="flightPrice"
					value={newTravel.flightPrice}
					onChange={handleTravelInputChange}
					/>
				</div>
				
				</div>
			</div>

			<div className="mb-3">
				<div className="row">
				<div className="col-md-4">
					<label htmlFor="transportSitPhoto" className="form-label hotel-color">
					Transportation Photo
					</label>
					<input
					required
					name="transportSitPhoto"
					id="transportSitPhoto"
					type="file"
					className="form-control"
					onChange={handleImageChangess}
					/>
					{imagePrevi && (
					<img
						src={imagePrevi}
						alt="Preview transportation photo"
						style={{ maxWidth: "100%", maxHeight: "200px" }}
						className="mt-3"
					/>
					)}
				</div>
				<div className="col-md-4">
					<label htmlFor="transportationPrice" className="form-label hotel-color">
					Transportation Price
					</label>
					<input
					required
					type="number"
					className="form-control"
					id="transportationPrice"
					name="transportationPrice"
					value={newTravel.transportationPrice}
					onChange={handleTravelInputChange}
					/>
				</div>
				</div>
        </div>
	   <div className="d-grid gap-2 d-md-flex mt-2">
				<Link to={"/existing-travels"} className="btn btn-outline-info">
									Back      
				</Link> 
		<button type="submit" className="btn btn-outline-primary ml-5">
					Save Services
				</button>  
		</div>
		</form>
		</div>
		</div>
		</section>
		</>
	);
};

export default AddTravel;
