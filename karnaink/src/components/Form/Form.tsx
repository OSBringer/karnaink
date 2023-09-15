import { useState, useContext, ChangeEvent } from "react";
import { Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../../modules/Alert";
import "./Form.scss";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@mui/material/styles";
import {
  FormControl,
  FormGroup,
  FormLabel,
  Typography,
  TextField,
  Button,
  Link,
  AlertColor,
} from "@mui/material";

import Datepicker from "../../modules/Datepicker/Datepicker";
import { LoaderContext } from "../../App";
import ReCAPTCHA from "react-google-recaptcha";
import instance from "../../axiosConfig";
import transImage from "../../images/trans.jpg";
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface FileItem {
  file: File;
  src: string;
}
const recaptchaSiteKey = import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY;
function Form(props) {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };
  const theme = useTheme() as any;
  const { setLoaderState } = useContext(LoaderContext);
  const [fileDescription, setFileDescription] = useState<FileItem[]>([]);
  const [filePlacement, setFilePlacement] = useState<FileItem[]>([]);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "error",
    message: "",
  });
  const [dateTime, setDateTime] = useState(null);
  const [recaptcha, setRecaptcha] = useState(null);

  const handleChange = (type: string, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const fileArray =
        type === "description" ? [...fileDescription] : [...filePlacement];
      const fDescArray = [...fileArray];

      if (fileArray.length < 3) {
        fDescArray.push({
          file: file as File, // Specify the type of `file` as `File`
          src: URL.createObjectURL(file),
        });

        type === "description"
          ? setFileDescription(fDescArray)
          : setFilePlacement(fDescArray);

        return;
      }
    }
    setSnackbarState({
      open: true,
      severity: "error",
      message: "Maximálny počet obrázkov je 3",
    });
    return;
  };

  const handleFileRemove = (type: string, index: number) => {
    const fileArray =
      type === "description" ? [...fileDescription] : [...filePlacement];
    fileArray.splice(index, 1);
    type === "description"
      ? setFileDescription(fileArray)
      : setFilePlacement(fileArray);
  };

  const handleSnacbarState = () => {
    setSnackbarState({
      open: !snackbarState.open,
      severity: "error",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dateTime) {
      setSnackbarState({
        open: true,
        severity: "error",
        message: "Niej je vybraný dátum",
      });
      return;
    }
    if (recaptcha === null || !recaptcha) {
      setSnackbarState({
        open: true,
        severity: "error",
        message: "Prosím potvrďte že nie ste robot",
      });
      return;
    }

    const formElement = document.getElementById("form") as HTMLFormElement;
    const formData = new FormData(formElement);

    formData.append("dateTime", dateTime.format("DD.MM.YYYY HH:00"));
    // formData.append("csrfmiddlewaretoken", getCookie("csrftoken"));
    fileDescription.forEach((file) => {
      formData.append("fileDescription", file.file);
    });
    filePlacement.forEach((file) => {
      formData.append("filePlacement", file.file);
    });
    setLoaderState(true);
    instance
      .post("/createAppointment/", formData, {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCookie("csrftoken"), // Include the CSRF token here
        },
      })
      .then((data) => {
        setLoaderState(false);
        if (data.status !== 200) {
          setSnackbarState({
            open: true,
            severity: "error",
            message: "Chyba vo vytváraní objednávky skúste to prosím neskôr",
          });
          return;
        }

        setSnackbarState({
          open: true,
          severity: "success",
          message: "Rezervácia vytvorená - počkajte prosím na potvrdenie",
        });
      })
      .catch((error) => {
        // Handle errors
        setLoaderState(false);
        setSnackbarState({
          open: true,
          severity: "error",
          message: "Chyba vo vytváraní objednávky skúste to prosím neskôr",
        });
        console.error(error);
      });
  };
  return (
    <Box
      sx={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
      }}
      className="custom sectionContainer"
    >
      <Box sx={{ marginTop: "50px" }}>
        <h1>Rezervácia</h1>
      </Box>
      <form
        id="form"
        action="/createAppointment/"
        className="formContainer"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <FormLabel component="legend" hidden>
            Email
          </FormLabel>
          <FormGroup>
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              id="form-email"
              aria-describedby="my-helper-text"
            />
          </FormGroup>
        </FormControl>
        <FormControl>
          <FormLabel component="legend" hidden>
            Meno
          </FormLabel>
          <TextField
            label="Meno"
            name="name"
            type="text"
            required
            id="form-name"
            aria-describedby="my-helper-text2"
          />
        </FormControl>
        <FormControl>
          <FormLabel component="legend" hidden>
            Priezvisko
          </FormLabel>
          <TextField
            label="Priezvisko"
            name="surname"
            required
            type="text"
            id="form-surname"
            aria-describedby="form-surname"
          />
        </FormControl>
        <FormControl>
          <FormLabel component="legend" hidden>
            Popis tetovania
          </FormLabel>
          <TextField
            multiline
            name="description"
            label="Popis tetovania"
            type="text"
            rows={5}
            required
            id="form-descripton"
            aria-describedby="my-helper-text2"
          />
          <Box className="imageFiles">
            {fileDescription.map((file, index) => (
              <Box className="imageContainer">
                <img src={file.src} />
                <ClearIcon
                  onClick={() => handleFileRemove("description", index)}
                  sx={{ bgcolor: theme.palette.background.paper }}
                  color={"error"}
                  className="removeIcon"
                />
                {/* {file.file.name} */}
              </Box>
            ))}
          </Box>
          <Button
            sx={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              flexDirection: "collumn",
              justifyContent: "space-around",
            }}
            variant="contained"
            component="label"
          >
            Nahrať obrázok
            <input
              name="fileDescription"
              type="file"
              accept="image/*"
              onChange={(e) => handleChange("description", e)}
              hidden
            />
          </Button>
        </FormControl>
        <FormControl>
          <FormLabel component="legend" hidden>
            Umiestnenie
          </FormLabel>
          <TextField
            label="Umiestnenie"
            name="placement"
            required
            type="text"
            id="form-placement"
            aria-describedby="my-helper-text2"
          />
          <Box className="imageFiles">
            {filePlacement.map((file, index) => (
              <Box key={index} className="imageContainer">
                <img src={file.src} />
                <ClearIcon
                  onClick={() => handleFileRemove("placement", index)}
                  sx={{ bgcolor: theme.palette.background.paper }}
                  color={"error"}
                  className="removeIcon"
                />
                {/* {file.file.name} */}
              </Box>
            ))}
          </Box>
          <Button
            sx={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              flexDirection: "collumn",
              justifyContent: "space-around",
            }}
            variant="contained"
            component="label"
          >
            Nahrať obrázok
            <input
              name="filePlacement"
              type="file"
              accept="image/*"
              onChange={(e) => handleChange("placement", e)}
              hidden
            />
          </Button>
        </FormControl>
        <FormControl>
          <FormLabel component="legend" hidden>
            Rozmer
          </FormLabel>
          <TextField
            label="Rozmer (cm x cm)"
            required
            name="ratio"
            id="form-ratio"
            aria-describedby="my-helper-text2"
          />
        </FormControl>
        <FormControl>
          <FormLabel component="legend" hidden>
            Rozpočet na tetovanie
          </FormLabel>
          <TextField
            required
            name="budget"
            label="Rozpočet (€)"
            type="number"
            id="form-budget"
            aria-describedby="my-helper-text2"
          />
        </FormControl>
        <FormControl>
          <FormLabel component="legend" hidden>
            Iné poznámky
          </FormLabel>
          <TextField
            name="other"
            label="Iné poznámky"
            multiline
            rows={5}
            id="form-other"
            aria-describedby="my-helper-text2"
          />
        </FormControl>
        <Datepicker onAccept={(val) => setDateTime(val)} />

        <FormControl
          sx={{ gridColumnStart: 1, gridColumnEnd: { xs: 1, sm: 3, md: 4 } }}
        >
          <Typography
            variant="body1"
            sx={{
              overflow: "clip",
              borderBottom: "2px solid #73513d",
              paddingBottom: 1,
            }}
          >
            Vytvorením rezervácie súhlasím so spracovaním
            <Link href="#"> osobných údajov</Link>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginTop: 1,
              borderBottom: "0px solid #73513d",
              overflow: "clip",
            }}
          >
            Rezervácia je platná až <u>po potvrdení a zaplatení zálohy</u> v
            sume, ktorá bude určená v potvrdzovacom emaili.
          </Typography>
          <ReCAPTCHA
            style={{ margin: "auto", marginTop: 10 }}
            sitekey={recaptchaSiteKey}
            onChange={(val) => setRecaptcha(val)}
          />
          ,
          <Button sx={{}} type="submit" variant="contained">
            Odoslať rezerváciu
          </Button>
        </FormControl>
      </form>

      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        sx={{ maxWidth: "100%" }}
        onClose={handleSnacbarState}
      >
        <Alert
          onClose={handleSnacbarState}
          severity={snackbarState.severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

Form.propTypes = {};

export default Form;
