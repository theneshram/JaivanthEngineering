import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { EmailService } from '../services/emailService';
import { ContactFormData } from '../types';

const router = Router();

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .optional()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage('Invalid phone number'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters'),
];

// POST /api/contact
router.post(
  '/contact',
  validateContact,
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
        return;
      }

      const contactData: ContactFormData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
      };

      // Send email
      const result = await EmailService.sendContactEmail(contactData);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error('Contact route error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

export default router;
