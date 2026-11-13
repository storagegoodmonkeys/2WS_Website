# Mobile Menu Button - Implementation Guide

## 1. HTML Changes Needed

In your `index.html`, find the navbar section and ADD a hamburger menu button:

```html
<nav class="navbar">
    <div class="container">
        <div class="nav-content">
            <div class="logo">
                <img src="assets/logos/Logotype.png" alt="Flick" class="logo-image">
            </div>
            <!-- ADD THIS HAMBURGER MENU BUTTON -->
            <button class="menu-toggle" onclick="toggleMobileMenu()" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <!-- END OF ADDITION -->
            <div class="nav-links">
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#about">About</a>
                <a href="#join">Join Waitlist</a>
            </div>
        </div>
    </div>
</nav>
```

## 2. CSS Changes Needed

Add the following CSS to your `styles.css` file (append at the end or add to the mobile section):

```css
/* Mobile Menu Button (Hamburger) */
.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
}

.menu-toggle span {
    width: 100%;
    height: 3px;
    background: var(--text-dark);
    border-radius: 3px;
    transition: all 0.3s ease;
}

.menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(8px, 8px);
}

.menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
}

@media (max-width: 640px) {
    .menu-toggle {
        display: flex;
    }

    .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        padding: 2rem;
        gap: 1.5rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }

    .nav-links.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }

    .nav-links a {
        font-size: 1.125rem;
        font-weight: 600;
        padding: 0.75rem 0;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        width: 100%;
        text-align: left;
    }

    .nav-links a:last-child {
        border-bottom: none;
    }
}
```

## 3. JavaScript

The JavaScript has already been added to `script.js` - no changes needed!

## Summary

- ✅ JavaScript is ready (toggleMobileMenu function)
- ⚠️ Need to add hamburger button HTML to navbar
- ⚠️ Need to add CSS styles to styles.css

The hamburger button will appear on screens 640px and below!
