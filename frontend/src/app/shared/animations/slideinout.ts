import { animate, style, transition, trigger } from "@angular/animations"

export const slideInOut = trigger("slideinout", [
    transition(":enter", [
        style({ bottom: "-100px" }),
        animate(
            "500ms ease-in-out",
        )
    ]),
    transition(":leave", [
        animate(
            "500ms ease-in-out",
            style({ bottom: "-200px" })
        )
    ]),
    transition('* => *', [
        animate('1000ms ease-in-out', style({ transform: 'translateY(0)' })),
    ]),
])