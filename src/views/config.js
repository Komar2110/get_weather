export const config = {
    css: "dhx_widget--bordered",
    padding: 20,
    width: "min-content",
    rows: [{
            type: "text",
            name: "text",
            value: "Введите координаты",
        },
        {
            validation: "numeric",
            name: "longitude",
            type: "input",
            label: "Долгота",
            labelPosition: "left",
            labelWidth: 60,
            width: 150,
        },
        {
            validation: "numeric",
            name: "latitude",
            type: "input",
            label: "Широта",
            labelPosition: "left",
            labelWidth: 60,
            width: 150,
        },
        {
            align: "center",
            cols: [{
                type: "button",
                text: "Отправить",
                id: "send",
            }]
        }
    ]
}