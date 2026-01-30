from enum import Enum


class Role(str, Enum):
    OPERATIVE = "OPERATIVE"
    PARTNER = "PARTNER"
    COMMAND = "COMMAND"


ROLE_LABELS = {
    Role.OPERATIVE: "Operative",
    Role.PARTNER: "Partner Organization",
    Role.COMMAND: "Command Authority"
}
