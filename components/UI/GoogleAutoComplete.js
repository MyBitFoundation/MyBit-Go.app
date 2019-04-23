import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";

const GoogleAutoComplete = ({
  key,
  input,
  countryCode = '',
  onSelectSuggest,
  children,
}) => (
    <ReactGoogleMapLoader
      params={{
        key,
        libraries: "places,geocode",
      }}
      render={googleMaps =>
        googleMaps && (
          <ReactGooglePlacesSuggest
            autocompletionRequest={{
              input,
              componentRestrictions: {
                country: countryCode,
              }
            }}
            googleMaps={googleMaps}
            onSelectSuggest={onSelectSuggest}
          >
            {children}
          </ReactGooglePlacesSuggest>
      )
    }
  />
)

export default GoogleAutoComplete;
