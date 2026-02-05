"""Input sanitization utilities."""

import bleach
import re
from typing import Any, Optional


def sanitize_string(value: str, allow_html: bool = False) -> str:
    """
    Sanitize string input to prevent XSS and injection attacks.
    
    Args:
        value: Input string to sanitize
        allow_html: Whether to allow safe HTML tags
        
    Returns:
        Sanitized string
    """
    if not isinstance(value, str):
        return str(value)
    
    # Remove null bytes
    value = value.replace("\x00", "")
    
    # Strip leading/trailing whitespace
    value = value.strip()
    
    if allow_html:
        # Allow only safe HTML tags
        allowed_tags = ["b", "i", "u", "em", "strong", "a", "p", "br"]
        allowed_attrs = {"a": ["href", "title"]}
        value = bleach.clean(value, tags=allowed_tags, attributes=allowed_attrs, strip=True)
    else:
        # Remove all HTML tags
        value = bleach.clean(value, tags=[], strip=True)
    
    return value


def sanitize_email(email: str) -> str:
    """
    Sanitize email address.
    
    Args:
        email: Email address to sanitize
        
    Returns:
        Sanitized email address
        
    Raises:
        ValueError: If email format is invalid
    """
    email = sanitize_string(email).lower()
    
    # Basic email validation
    email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    if not re.match(email_pattern, email):
        raise ValueError("Invalid email format")
    
    return email


def sanitize_dict(data: dict, allow_html: bool = False) -> dict:
    """
    Recursively sanitize all string values in a dictionary.
    
    Args:
        data: Dictionary to sanitize
        allow_html: Whether to allow safe HTML in strings
        
    Returns:
        Sanitized dictionary
    """
    sanitized = {}
    
    for key, value in data.items():
        if isinstance(value, str):
            sanitized[key] = sanitize_string(value, allow_html=allow_html)
        elif isinstance(value, dict):
            sanitized[key] = sanitize_dict(value, allow_html=allow_html)
        elif isinstance(value, list):
            sanitized[key] = [
                sanitize_string(item, allow_html=allow_html) if isinstance(item, str) else item
                for item in value
            ]
        else:
            sanitized[key] = value
    
    return sanitized


def validate_password_strength(password: str) -> tuple[bool, Optional[str]]:
    """
    Validate password strength.
    
    Args:
        password: Password to validate
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if len(password) > 128:
        return False, "Password must be less than 128 characters"
    
    # Check for at least one uppercase letter
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter"
    
    # Check for at least one lowercase letter
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter"
    
    # Check for at least one digit
    if not re.search(r"\d", password):
        return False, "Password must contain at least one number"
    
    # Check for at least one special character
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "Password must contain at least one special character"
    
    return True, None
