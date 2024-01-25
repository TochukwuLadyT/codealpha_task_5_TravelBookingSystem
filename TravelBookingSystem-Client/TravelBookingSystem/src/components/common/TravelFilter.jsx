import React, { useState } from 'react'

const TravelFilter = ({ data, setFilteredData}) => {
    const [filter, setFilter] = useState("")

	const handleSelectChange = (e) => {
		const selectedCountry = e.target.value
		setFilter(selectedCountry)

		const filteredCountries = data.filter((travel) => 
		travel.country.toLowerCase().includes(selectedCountry.toLowerCase())
		)	
		setFilteredData(filteredCountries)
	} 

    const clearFilter = () => {
		setFilter("")
		setFilteredData(data)
	}

	const countries = ["", ...new Set(data.map((travel) => travel.country))]

  return (
    <div className="input-group mb-3">
			<span className="input-group-text" id="country-filter">
				Country
			</span>
			<select
				className="form-select"
				aria-label="country"
				value={filter}
				onChange={handleSelectChange}>
				<option value="">Select Country</option>
				{countries.map((type, index) => (
					<option key={index} value={String(type)}>
						{String(type)}
					</option>
				))}
			</select>
			<button className="btn btn-hotel" type="button" onClick={clearFilter}>
				Clear Filter
			</button>
		</div>
  )
}

export default TravelFilter
