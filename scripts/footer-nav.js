fetch("../footer-nav.html")
    .then((response) => response.text())
    .then((data) => {
        let old_element = document.querySelector(
            "script#replace-with-footer-navbar"
        )
        let new_element = DOMParser()
            .parseFromString(data, "text/html")
            .querySelector("nav")
        old_element.parentNode.replaceChild(new_element, old_element)
    })
    .catch((err) => console.log(err))
