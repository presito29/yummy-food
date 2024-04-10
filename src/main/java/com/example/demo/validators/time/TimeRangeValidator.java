package com.example.demo.validators.time;


import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalTime;


public class TimeRangeValidator implements ConstraintValidator<TimeRange, LocalTime> {

    private String startTime;
    private String endTime;


    @Override
    public void initialize(TimeRange constraintAnnotation) {
        this.startTime = constraintAnnotation.startTime();
        this.endTime = constraintAnnotation.endTime();
    }

    @Override
    public boolean isValid(LocalTime localTime, ConstraintValidatorContext constraintValidatorContext) {

        LocalTime startTime = parseTime(this.startTime);
        LocalTime endTime = parseTime(this.endTime);


        boolean isValid = !localTime.isBefore(startTime) && !localTime.isAfter(endTime);

        if (!isValid) {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext.buildConstraintViolationWithTemplate("Time must be between " + this.startTime + " and " + this.endTime)
                    .addConstraintViolation();
        }

        return isValid;
    }

    private LocalTime parseTime(String time) {
        return LocalTime.parse(time);
    }
}
