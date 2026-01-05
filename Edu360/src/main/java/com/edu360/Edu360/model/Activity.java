package com.edu360.Edu360.model;
import jakarta.persistence.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@Entity
@Table(name = "activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Enumerated(EnumType.STRING)
    private ActivityType type;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate activityDate;

    private String provider;

    private String fileUrl;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    @ManyToOne
    @JoinColumn(name = "verified_by")
    private Teacher verifiedBy;

    public enum ActivityType {
        CERTIFICATE, INTERNSHIP, WORKSHOP, COMPETITION, VOLUNTEERING, OTHERS
    }

    public enum Status {
        PENDING, APPROVED, REJECTED
    }
    public Activity(){}

    public Activity(Student student, ActivityType type, String title, String description, LocalDate activityDate, String provider, String fileUrl, Status status, Teacher verifiedBy) {
        this.student = student;
        this.type = type;
        this.title = title;
        this.description = description;
        this.activityDate = activityDate;
        this.provider = provider;
        this.fileUrl = fileUrl;
        this.status = status;
        this.verifiedBy = verifiedBy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public ActivityType getType() {
        return type;
    }

    public void setType(ActivityType type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Teacher getVerifiedBy() {
        return verifiedBy;
    }

    public void setVerifiedBy(Teacher verifiedBy) {
        this.verifiedBy = verifiedBy;
    }
}