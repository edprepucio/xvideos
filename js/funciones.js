            window.onload = function() {
                const imagApagada = document.getElementById("imagApagada");
                const imagEncendida = document.getElementById("imagEncendida");
                const imagenes = document.querySelectorAll("img");

                imagApagada.addEventListener("click", function() {
                    imagenes[0].src = "../img/images2.png";

                });

                imagEncendida.addEventListener("click", function() {
                    imagenes[0].src = "../img/image1.png";
                });
            }; 

            
                        function calcular(operacion) {
                let num1 = parseFloat(document.getElementById("num1").value);
                let num2 = parseFloat(document.getElementById("num2").value);
                let resultado;

                switch(operacion) {
                    case '+':
                        resultado = num1 + num2;
                        break;
                    case '-':
                        resultado = num1 - num2;
                        break;
                    case '*':
                        resultado = num1 * num2;
                        break;
                    case '/':
                        resultado = num1 / num2;
                        break;
                }

                document.getElementById("resultado").textContent = "Resultado: " + resultado;
            }
