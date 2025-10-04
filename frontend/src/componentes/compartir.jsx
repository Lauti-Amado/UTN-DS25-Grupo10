import React, { useState } from "react";
import { ListGroup, Image, Toast, ToastContainer } from "react-bootstrap";
import styles from "./compartir.module.css";
import facebook from "../assets/Facebook_Logo_(2019).png";
import wsp from "../assets/WhatsApp.svg.png";
import ig from "../assets/logoInsta2.png";
import twx from "../assets/x.png";
import pp from "../assets/copiar.png";

export default function Compartir({ onCerrar, usuarioId }) {
  // Enlace del perfil según id usuario
  const perfilUrl = `${window.location.origin}/perfil/${usuarioId}`;
  const [mostrarToast, setMostrarToast] = useState(false);

  // Copiar enlace al portapapeles
  const copiarEnlace = () => {
    navigator.clipboard
      .writeText(perfilUrl)
      .then(() => {
        setMostrarToast(true); // Mostrar toast
        setTimeout(() => setMostrarToast(false), 2000);
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
      });
  };

  // Compartir en WhatsApp
  const compartirWhatsApp = () => {
    const mensaje = encodeURIComponent(`Mirá mi perfil en RoDi: ${perfilUrl}`);
    window.open(`https://wa.me/?text=${mensaje}`, "_blank");
  };

  // Compartir en Facebook
  const compartirFacebook = () => {
    const url = encodeURIComponent(perfilUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  // Compartir en Twitter (X)
  const compartirTwitter = () => {
    const texto = encodeURIComponent(`Mirá mi perfil en RoDi 👀: ${perfilUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${texto}`, "_blank");
  };

  // "Compartir" en Instagram (abre IG y copia el link) porque no se puede hacer directamente
  const compartirInstagram = () => {
    copiarEnlace();
    window.open("https://www.instagram.com/", "_blank");
  };

  return (
    <div className={styles.contenedor}>
      <h4 className={styles.titulo}>Compartir perfil</h4>

      <ListGroup>
        <ListGroup.Item
          action
          onClick={compartirWhatsApp}
          className={styles.itemLista}
        >
          <Image src={wsp} roundedCircle className={styles.logoEmpresa} />
          <p className={styles.nombreEmpresa}>WhatsApp</p>
        </ListGroup.Item>

        <ListGroup.Item
          action
          onClick={compartirFacebook}
          className={styles.itemLista}
        >
          <Image src={facebook} roundedCircle className={styles.logoEmpresa} />
          <p className={styles.nombreEmpresa}>Facebook</p>
        </ListGroup.Item>

        <ListGroup.Item
          action
          onClick={compartirTwitter}
          className={styles.itemLista}
        >
          <Image src={twx} roundedCircle className={styles.logoEmpresa} />
          <p className={styles.nombreEmpresa}>X</p>
        </ListGroup.Item>

        <ListGroup.Item
          action
          onClick={compartirInstagram}
          className={styles.itemLista}
        >
          <Image src={ig} roundedCircle className={styles.logoEmpresa} />
          <p className={styles.nombreEmpresa}>Instagram</p>
        </ListGroup.Item>

        <ListGroup.Item
          action
          onClick={copiarEnlace}
          className={styles.itemLista}
        >
          <Image src={pp} roundedCircle className={styles.logoEmpresa} />
          <p className={styles.nombreEmpresa}>Copiar enlace</p>
        </ListGroup.Item>
      </ListGroup>

      <button className={styles.btnCerrar} onClick={onCerrar}>
        Cerrar
      </button>

      {/* Toast flotante (funcion de bootstrap) */}
      <ToastContainer position="top-center" className="p-3">
        <Toast
          show={mostrarToast}
          onClose={() => setMostrarToast(false)}
          bg="success"
          autohide
          delay={2000}
        >
          <Toast.Body style={{ color: "white" }}>
            ✅ ¡Enlace copiado al portapapeles!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
