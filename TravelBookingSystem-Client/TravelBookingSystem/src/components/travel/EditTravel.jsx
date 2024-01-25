import React, { useEffect, useState } from 'react'
import { getTravelById, updateTravelService } from '../utils/ApiFunctions';
import {useParams, Link} from "react-router-dom"

const EditTravel = () => {
  const [travel, setTravel] = useState({
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

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [imagePrevie, setImagePrevie] = useState("");
    const [imagePrevi, setImagePrevi] = useState("");

    const {travelId} = useParams()

    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0]
      setTravel({ ...travel, roomPhoto: selectedImage })
      setImagePreview(URL.createObjectURL(selectedImage))
    }
  
    const handleImageChanges = (e) => {
      const selectedImage = e.target.files[0]
      setTravel({ ...travel, flightSitPhoto: selectedImage })
      setImagePrevie(URL.createObjectURL(selectedImage))
    }
  
    const handleImageChangess = (e) => {
      const selectedImage = e.target.files[0]
      setTravel({ ...travel, transportSitPhoto: selectedImage })
      setImagePrevi(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (event) => {
      const { name, value } = event.target
      setTravel({ ...travel, [name]: value })
    }

    useEffect(() => {
      const fetchTravel = async () => {
        try{
          const travelData = await getTravelById(travelId)
          setTravel(travelData)
          setImagePreview(travelData.roomPhoto)
          setImagePrevie(travelData.flightSitPhoto)
          setImagePrevi(travelData.transportSitPhoto)
        } catch (error){
          console.error
        }
      }
      fetchTravel()
    }, [travelId])

    const handleSubmit = async (e) => {
      e.preventDefault()

      try{
        const response = await updateTravelService(travelId, travel)
        if (response.status === 200){
          setSuccessMessage("Travel Service updated successfully!")
          const updatedTravelData =  await getTravelById(travelId)
          setTravel(updatedTravelData)
          setImagePreview(updatedTravelData.roomPhoto)
          setImagePrevie(updatedTravelData.flightSitPhoto)
          setImagePrevi(updatedTravelData.transportSitPhoto)
          setErrorMessage("")
        } else {
          setErrorMessage("Error updating travel service")
        }
      } catch (error){
        console.error(error)
        setErrorMessage(error.errorMessage)
      }
    }

   

  return (
    <>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6"><br></br>
						<h5 className="mt-5 mb-2">Edit Travel Service</h5>
						{successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

						<form onSubmit={handleSubmit}>
             <div className="mb-3">
							<label htmlFor="country" className="form-label hotel-color">
								Country
							</label>
							<input
								type="text"
								className="form-control"
								id="country"
								name="country"
								value={travel.country}
								onChange={handleInputChange}
							/>
						    </div>
              
                <div className="mb-3">
							<label htmlFor="cityName" className="form-label hotel-color">
								City
							</label>
							<input
								type="text"
								className="form-control"
								id="cityName"
								name="cityName"
								value={travel.cityName}
								onChange={handleInputChange}
							/>
						    </div>

              <div className="mb-3">
							<label htmlFor="hotelName" className="form-label hotel-color">
								Hotel Name
							</label>
							<input
								type="text"
								className="form-control"
								id="hotelName"
								name="roohotelNamemType"
								value={travel.hotelName}
								onChange={handleInputChange}
							/>
						    </div>

              <div className="mb-3">
							<label htmlFor="roomType" className="form-label hotel-color">
								Room Type
							</label>
							<input
								type="text"
								className="form-control"
								id="roomType"
								name="roomType"
								value={travel.roomType}
								onChange={handleInputChange}
							/>
						    </div>

              <div className="mb-3">
							<label htmlFor="flightName" className="form-label hotel-color">
								Flight Name
							</label>
							<input
								type="text"
								className="form-control"
								id="flightName"
								name="flightName"
								value={travel.flightName}
								onChange={handleInputChange}
							/>
						    </div>


                <div className="mb-3">
							<label htmlFor="flightType" className="form-label hotel-color">
								Flight Type
							</label>
							<input
								type="text"
								className="form-control"
								id="flightType"
								name="flightType"
								value={travel.flightType}
								onChange={handleInputChange}
							/>
						    </div>

              <div className="mb-3">
							<label htmlFor="transportationName" className="form-label hotel-color">
								Transportation Name
							</label>
							<input
								type="text"
								className="form-control"
								id="transportationName"
								name="transportationName"
								value={travel.transportationName}
								onChange={handleInputChange}
							/>
						    </div>
              <div className="mb-3">
							<label htmlFor="transportationType" className="form-label hotel-color">
								Transportation Type
							</label>
							<input
								type="text"
								className="form-control"
								id="transportationType"
								name="transportationType"
								value={travel.transportationType}
								onChange={handleInputChange}
							/>
						    </div>

							<div className="mb-3">
							<label htmlFor="roomPhoto" className="form-label hotel-color">
								Room Photo
							</label>
							<input
								
								type="file"
								className="form-control"
								id="roomPhoto"
								name="roomPhoto"
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<img
									src={`data:image/jpeg;base64,${imagePreview}`}
									alt="Room preview"
									style={{ maxWidth: "100px", maxHeight: "200" }}
									className="mt-3"
								/>
							)}
						</div>
							<div className="mb-3">
								<label htmlFor="roomPrice" className="form-label hotel-color">
									Room Price
								</label>
								<input
									
									type="number"
									className="form-control"
									id="roomPrice"
									name="roomPrice"
									value={travel.roomPrice}
									onChange={handleInputChange}
								/>
							</div>

              <div className="mb-3">
							<label htmlFor="flightSitPhoto" className="form-label hotel-color">
								Flight Photo
							</label>
							<input
							
								type="file"
								className="form-control"
								id="flightSitPhoto"
								name="flightSitPhoto"
								onChange={handleImageChanges}
							/>
							{imagePrevie && (
								<img
									src={`data:image/jpeg;base64,${imagePrevie}`}
									alt="Flight preview"
									style={{ maxWidth: "100px", maxHeight: "200" }}
									className="mt-3"
								/>
							)}
						</div>
							<div className="mb-3">
								<label htmlFor="flightPrice" className="form-label hotel-color">
									Flight Price
								</label>
								<input
									
									type="number"
									className="form-control"
									id="flightPrice"
									name="flightPrice"
									value={travel.flightPrice}
									onChange={handleInputChange}
								/>
							</div>

              <div className="mb-3">
							<label htmlFor="roomPhoto" className="form-label hotel-color">
								Transportation Photo
							</label>
							<input
								
								type="file"
								className="form-control"
								id="transportationPhoto"
								name="transportationPhoto"
								onChange={handleImageChangess}
							/>
							{imagePrevi && (
								<img
									src={`data:image/jpeg;base64,${imagePrevi}`}
									alt="Transportation preview"
									style={{ maxWidth: "100px", maxHeight: "200" }}
									className="mt-3"
								/>
							)}
						</div>
							<div className="mb-3">
								<label htmlFor="transportionPrice" className="form-label hotel-color">
                Transportion Price
								</label>
								<input
									
									type="number"
									className="form-control"
									id="transportationPrice"
									name="transportationPrice"
									value={travel.transportationPrice}
									onChange={handleInputChange}
								/>
							</div>

							<div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-travels"} className="btn btn-outline-info">
                                    Back      
                                </Link>
								<button type="submit" className="btn btn-outline-primary ml-5">
									Update Services
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>

    
  )
}

export default EditTravel
